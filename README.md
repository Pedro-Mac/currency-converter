# Getting Started

## Dependencies

In order to install the dependencies, you can `npm install`

## Scripts

- Run `npm start` to start development mode.
- Run `npm build` in order to build the app for production.

## Challenges

- ### Select currency to convert

  Initially, I tried to use a `select` field to display the options of currencies to convert, only to realize the countless limitatios to that approach, specially with styling. I had to re-do it, now using a radio type input and I was pretty impressed with the outcome. I had never done it and even though I feel like it could have been done better, I did make it and I learned something new once again.

- ### Debounce

  I had a rough time with this one. I had done debouncing before and I thought it would be super easy. Only later I realized I was returning the wrong _eventListener_ as the _useEffect_ cleanup function. It was challenging not because it is hard by itself, but because I wasted tones of time until I realize what was wrong.

- ### Convertion rates
  It took me some time until I was able to convert things properly. The API had mainly convertions with USD only, so I had to figure how to convert from currency _A_ to USD to currency _B_. Seems easy now that I just wrote it but it wasn't that easy when I had to program it.

## Wins

I would say that my biggest wins came from the biggest challenges that I faced. That's how we measure success right? The bigger the challenge, the bigger the success
