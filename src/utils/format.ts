const FormatUtils = {
  numberToCurrency(value: number) {
    return new Intl.NumberFormat('de-DE').format(value)
  },
  numberToSocialMediaStyle(value: number) {
    return new Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 1
    })
      .format(value)
      .replace('.', ',')
      .toLowerCase()
  }
}

export default FormatUtils
