import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }


  userAdress(data) {
    return this.request("/wxuser/userAdress", data, "POST")
  }
}

export { api };