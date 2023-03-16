const currentDate = (timeStamp: string | number | undefined) => {
  if (!timeStamp) {
    return false;
  }

  const date = new Date(timeStamp);

  const year = date.getFullYear();
  return `${year}`;
};

export default currentDate;