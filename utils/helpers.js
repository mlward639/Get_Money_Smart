module.exports = {
  format_date_time: (timestamp) => {
    // Format date as MM/DD/YYYY
    const date = timestamp.toLocaleDateString();
    const time = timestamp.toLocaleTimeString();

    return `${date} at ${time}`;
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};
