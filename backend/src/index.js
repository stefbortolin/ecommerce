import app from "./App";

app.listen(app.get('port'))

console.log('server on port', app.get('port'))