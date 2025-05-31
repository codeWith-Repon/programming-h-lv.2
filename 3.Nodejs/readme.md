### Install nodejs usnig fnm

powershell

```bash
winget install Schniz.fnm
```

check version

```bash
fnm --version
```

if show error
file explorer -> C:\Users\repon\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe
copy ->
envronment veriables ->
select path ->
edit ->
new ->
past path
-> ok

pest path in env and save

```bash
fnm install 22
```

check version

```bash
node -v
```

if threw an error
file explorer -> C:\Users\repon\AppData\Roaming\fnm\aliases\default
copy ->
envronment veriables ->
select path ->
edit ->
new ->
past path
-> ok

check versions

```bash
fnm ls
```

if you need to install another version

```bash
fnm i 24 #install 24 version
```

run this and check version proparley install or not

```bash
fnm ls
```

switch version

```bash
fnm use 24
```

if show error
poweshell run administrator

run this

```bash
Get-ExecutionPolicy #restricted
Set-ExecutionPolicy Unrestrict
```

now you can switch another version.
