@echo off
call bun run prepack
call git checkout main
call git add --all
if %1.==. (
    call git commit -m "Release %date% %time%"
) else (
    call git commit -m "Release %date% %time%" -m %1
)

call git push
@REM call git rebase main release
@REM call git push origin -u release
@REM call git checkout main