$schemaPath = "src/schema.ts"
$csvPath = "Monthly data_Academic_Department_data_Updated (1).csv"

$schemaText = Get-Content -Path $schemaPath -Raw
$start = $schemaText.IndexOf("SHEET_CONFIGS")
if ($start -lt 0) { throw "SHEET_CONFIGS not found" }
$braceStart = $schemaText.IndexOf('{', $start)
$depth = 0
$end = -1
for ($i = $braceStart; $i -lt $schemaText.Length; $i++) {
  $ch = $schemaText[$i]
  if ($ch -eq '{') { $depth++ }
  elseif ($ch -eq '}') { $depth--; if ($depth -eq 0) { $end = $i; break } }
}
if ($end -lt 0) { throw "SHEET_CONFIGS closing brace not found" }
$body = $schemaText.Substring($braceStart + 1, $end - $braceStart - 1)

$keys = [System.Collections.Generic.List[string]]::new()
$depth = 0
foreach ($line in ($body -split "`r?`n")) {
  $trim = $line.Trim()
  if ($trim.Length -eq 0) { continue }
  if ($trim -match "^[}\]]") { $depth-- }
  if ($depth -eq 0 -and $trim -match '^(?:"(?<k1>[^"]+)"|''(?<k2>[^'']+)''|(?<k3>[A-Za-z_][A-Za-z0-9_]*))\s*:') {
    $k = if ($Matches.k1) { $Matches.k1 } elseif ($Matches.k2) { $Matches.k2 } else { $Matches.k3 }
    if (-not $keys.Contains($k)) { [void]$keys.Add($k) }
  }
  $open = ([regex]::Matches($line, "\\{")).Count + ([regex]::Matches($line, "\\[")).Count
  $close = ([regex]::Matches($line, "\\}")).Count + ([regex]::Matches($line, "\\]")).Count
  $depth += ($open - $close)
}

$headingSet = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$lines = Get-Content -Path $csvPath
foreach ($line in $lines) {
  $trim = $line.Trim()
  if ([string]::IsNullOrWhiteSpace($trim)) { continue }
  $firstCell = ($trim -split ',')[0].Trim().Trim('"')
  if ([string]::IsNullOrWhiteSpace($firstCell)) { continue }
  $isNumbered = $firstCell -match '^\d+\s*[\.)-]\s*\S+'
  $isProminent = ($firstCell -match '^[A-Z][A-Z\s/&()\-]{4,}$') -or ($firstCell -match '^[A-Za-z][A-Za-z\s/&()\-]{6,}$')
  if ($isNumbered -or $isProminent) {
    $normalized = ($firstCell -replace '\s+', ' ').Trim(':').Trim()
    [void]$headingSet.Add($normalized)
  }
}
$headings = $headingSet.ToArray() | Sort-Object

function Get-Lev([string]$a,[string]$b) {
  $n = $a.Length
  $m = $b.Length
  $d = New-Object 'int[,]' ($n + 1), ($m + 1)
  for ($i = 0; $i -le $n; $i++) { $d[$i,0] = $i }
  for ($j = 0; $j -le $m; $j++) { $d[0,$j] = $j }
  for ($i = 1; $i -le $n; $i++) {
    for ($j = 1; $j -le $m; $j++) {
      $cost = if ($a[$i-1] -ceq $b[$j-1]) { 0 } else { 1 }
      $x = $d[($i-1),$j] + 1
      $y = $d[$i,($j-1)] + 1
      $z = $d[($i-1),($j-1)] + $cost
      $d[$i,$j] = [Math]::Min([Math]::Min($x, $y), $z)
    }
  }
  return $d[$n,$m]
}

$exact = @()
$caseOnly = @()
$suggest = @()

foreach ($k in $keys) {
  $exactHit = $headings | Where-Object { $_ -ceq $k } | Select-Object -First 1
  if ($exactHit) { $exact += "- $k = $exactHit"; continue }
  $caseHit = $headings | Where-Object { $_ -ieq $k } | Select-Object -First 1
  if ($caseHit) { $caseOnly += "- $k <-> $caseHit (normalize case to '$k')"; continue }

  $best = $headings | ForEach-Object {
    [PSCustomObject]@{ H = $_; D = (Get-Lev ($k.ToLower()) ($_.ToLower())) }
  } | Sort-Object D, H | Select-Object -First 3

  $choices = ($best | ForEach-Object { "$($_.H) (d=$($_.D))" }) -join '; '
  $suggest += "- $k -> $choices"
}

Write-Output "Exact matches:"
if ($exact.Count) { $exact } else { "- None" }
Write-Output ""
Write-Output "Case-only mismatches:"
if ($caseOnly.Count) { $caseOnly } else { "- None" }
Write-Output ""
Write-Output "Actionable mapping suggestions:"
if ($suggest.Count) { $suggest } else { "- None" }
