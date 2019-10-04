function change(nation){
  switch (nation) {
    case "Australia":
        return 'AUD'
    break;
    case "Canada":
        return 'CAD'
    break;
    case "China":
        return 'CNY'
    break;
    case "Europian Union":
        return 'EUR'
    break;
    case "England":
        return 'GBP'
    break;
    case "Hongkong":
        return 'HKD'
    break;
    case "India":
        return 'INR'
    break;
    case "Japan":
        return 'JPY'
    break;
    case "Mexico":
        return 'MXN'
    break;
    case "Malaysia":
        return 'MYR'
    break;
    case "New Zealand":
        return 'NZD'
    break;
    case "Russia":
        return 'RUB'
    break;
    case "Singapore":
        return 'SGD'
    break;
    case "Thailand":
        return 'THB'
    break;
    case "Taiwan":
      return 'TWD'
    break;
    case "United States":
        return 'USD'
    break;
    case "Vietnam":
        return 'VND'
    break;
    case "Indonesia":
        return 'IDR'
    default:
      break;
  }
}

module.exports = change
	
	
	