# React Parallax Button

Bring your react buttons to next level with parallax effect.

Demo: https://react-parallax.firebaseapp.com/

## Preview
![Preview](https://raw.githubusercontent.com/venits/react-parallax-button/master/demo.gif)

## Installation

Install module:

```js
 npm i -s react-parallax-button
```
Import it in your React project:
```js
import { ParallaxButton, ParallaxWrapper} from 'react-parallax-button'
```

## Usage

### ParallaxButton

This is the most basic components. It allows you to create simple buttons with parallax effect.

All you have to do to create button:
```js
render() {
  return (
    <ParallaxButton text="Amazing button"/>
  )
}
```

Additionally you can pass few props for custom use:
```js
<ParallaxButton  
  text="Custom Button"  
  parallaxScale={0.5}  
  backgroundStyle={{  
    background: 'linear-gradient(right, #fc4a1a, #f7b733)',  
    borderRadius: '8px',  
    boxShadow: '0 4px 8px rgba(0, 0, 0, .3)'  
  }}  
  textStyle={{  
    padding: '1.5em 2.5em 1.5em 2.5em',  
    color: 'white'  
  }}  
/>
```

Prop called `parallaxScale` is responsible of intensity of parallax effect. Default value is 1.
Setting value to `0.5` will make your parallax effect half intensive.

### ParallaxWrapper

This component will allow you to add parallax effect to any view or image in your application.

Simply wrap your component with `ParallaxWrapper` and you good to go ;)

```js
<ParallaxWrapper>  
  <img src={your_image} alt=""/>  
</ParallaxWrapper>
```

You can check how it works by visiting [this page](https://react-parallax.firebaseapp.com/).

## Summary

I hope you will like this simple component and use it in your website, also if you have any problems or questions please let me know, I will be more than happy to help you :)

My email:  [tomasz.przybyl.it@gmail.com](mailto:tomasz.przybyl.it@gmail.com)



