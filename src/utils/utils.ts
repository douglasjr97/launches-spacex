export function empty(e:any){
    switch (e) {
      case '':
      case 0:
      case '0':
      case null:
      case []:
      case false:
      case typeof e === 'undefined':
        return true;
      default:
        return false;
    }
  }