Bot for user activities simulator. Uses for load-tesitng of sharedb server.

#1. npm install / yarn
#2. starts with next params *wsUrl* (url of ws connection), *collections*, *connections* (amount of generated instanses)

*Exapmle:* node index wsUrl=wss://sthelabkit.deloitte.com/channel connections=100 collections=images,files,users
#1. It'll generate 100 "user's" connection
#2. Each user will interract (fetch some docs) with random collection from *collections* param

