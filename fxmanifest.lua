fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'
author 'Enzo'
version '1.0.0'

dependencies {'/onesync'}

shared_scripts {'@ox_lib/init.lua','config.lua'}

server_scripts {'server.lua'}

client_scripts {'client.lua'}

ui_page 'web/build/index.html'

files {'web/build/index.html', 'web/build/assets/*.js', 'web/build/assets/*.css', 'web/build/*.png'}
