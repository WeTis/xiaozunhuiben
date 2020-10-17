import { HTTP } from '../../utils/http.js'

class api extends HTTP {

  constructor() {
    super();
  }


  getcard(data) {
    return this.request("/wxuser/getCar", data, "POST")
  }
  clearCard(data) {
    
    return this.request("/wxuser/clearCar", data, "POST")
  }
}

export { api };