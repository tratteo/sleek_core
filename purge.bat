call bun nuxt cleanup
call rmdir /s /q node_modules
call del package-lock.json
call del bun.lock

cd playground
call bun nuxt cleanup
call rmdir /s /q node_modules
call del package-lock.json
call del bun.lock

cd ../