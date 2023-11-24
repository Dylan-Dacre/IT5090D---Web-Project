const quotes = [
  "“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein",
  "“Learn as if you will live forever, live like you will die tomorrow.” — Mahatma Gandhi",
  "“Stay away from those people who try to disparage your ambitions. Small minds will always do that, but great minds will give you a feeling that you can become great too.” — Mark Twain",
  "“The greatest glory in living lies not in never falling, but in rising every time we fall.” — Nelson Mandela",
  "“The way to get started is to quit talking and begin doing.” — Walt Disney",
  "“If life were predictable it would cease to be life, and be without flavor.” — Eleanor Roosevelt",
  "“If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.” — Oprah Winfrey",
  "“If you set your goals ridiculously high and it’s a failure, you will fail above everyone else’s success.” — James Cameron",
];

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

const quote = getRandomQuote();

export default quote;
