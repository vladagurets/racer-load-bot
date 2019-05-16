# Bot for user activities simulator.

Uses for load-tesitng of sharedb server.

- npm install / yarn
- starts with prefered params
  - *wsUrl* (url of ws connection)
  - *collections*
  - *connections* (amount of generated instanses)
  - *lifetime* (time of user's session in min)

*Exapmle:*  ```node index wsUrl=wss://sthelabkit.deloitte.com/channel connections=100 collections=images,files,users lifeTime=5``` 
- It'll generate 100 "user's" connection
- Each user will interract (fetch some docs) with random collection from *collections* param