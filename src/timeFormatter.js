const timeFormatter = (datetimeString)=>{
  const datetime = new Date(datetimeString)
  const formattedDate = datetime.toLocaleDateString('en-US')
  const formattedTime = datetime.toLocaleTimeString('en-US')
  const formattedDatetime = `${formattedDate} at ${formattedTime}`
  return formattedDatetime
}
export default timeFormatter