# Draws the Pulse icon: the heartbeat mark on black, blue dot dropping from the low peak.
param([string]$Out = (Join-Path $PSScriptRoot '..\icons'))
Add-Type -AssemblyName System.Drawing

function New-Color([string]$hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function Draw-Icon([int]$size, [string]$file) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear((New-Color '#000000'))
  $u = $size / 120.0   # same 120 grid as the in-app illustrations

  function Pen([string]$hex, [double]$w) {
    $p = New-Object System.Drawing.Pen (New-Color $hex), ([single]($w * $u))
    $p.StartCap = 'Round'; $p.EndCap = 'Round'; $p.LineJoin = 'Round'
    return $p
  }
  function P([double]$x, [double]$y) { New-Object System.Drawing.PointF ([single]($x * $u)), ([single]($y * $u)) }

  # the Pulse mark: white heartbeat line with the blue dot dropping from the low peak
  $k = 1.4; $ox = 15; $oy = 22
  function Q([double]$x, [double]$y) { P ($ox + $x * $k) ($oy + $y * $k) }
  $line = Pen '#FFFFFF' (6 * $k)
  $pts = [System.Drawing.PointF[]]@((Q 3 22), (Q 15 22), (Q 20 10), (Q 29 34), (Q 36 16), (Q 40 22), (Q 61 22))
  $g.DrawLines($line, $pts)
  $blue = New-Object System.Drawing.SolidBrush (New-Color '#3D5AFE')
  $rx = 3.8 * $k * $u; $ry = 4.6 * $k * $u
  $c = Q 29 44
  $g.FillEllipse($blue, [single]($c.X - $rx), [single]($c.Y - $ry), [single](2 * $rx), [single](2 * $ry))

  $bmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

New-Item -ItemType Directory -Force $Out | Out-Null
Draw-Icon 180 (Join-Path $Out 'apple-touch-icon.png')
Draw-Icon 192 (Join-Path $Out 'icon-192.png')
Draw-Icon 512 (Join-Path $Out 'icon-512.png')
Draw-Icon 1024 (Join-Path $Out 'icon-1024.png')
Write-Output 'icons written'
