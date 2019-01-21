# React Variants

```
yarn add @dimg/react-variants
```

## Purpose

Groups of styles and props often occur together. For instance, enabled and disabled buttons may have the following styling and
props:

```js
const theme = {
  button: {
    enabled: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 2,
      textColor: 'black'
    },
    disabled: {
      backgroundColor: '#aaa',
      borderColor: '#555',
      borderStyle: 'dashed',
      borderWidth: 2,
      textColor: '#555'
    }
  }
}
```
```js
const styles = theme => ({
  enabledButton: {
    border: {
      color: theme.button.enabled.borderColor,
      style: theme.button.enabled.borderStyle,
      width: theme.button.enabled.borderWidth
    },
    backgroundColor: theme.button.enabled.backgroundColor
  },
  enabledButtonText: {
    color: theme.button.enabled.textColor
  },
  disabledButton: {
    border: {
      color: theme.button.disabled.borderColor,
      style: theme.button.disabled.borderStyle,
      width: theme.button.disabled.borderWidth
    },
    backgroundColor: theme.button.disabled.backgroundColor
  },
  disabledButtonText: {
    color: theme.button.disabled.textColor
  },
})
```
```js
const enhancer = injectSheet(styles)

const Button = ({classes, disabled, label, ...rest}) =>
  <button
    className={disabled ? classes.disabledButton : classes.enabledButton}
    disabled={disabled}
    {...rest}
  >
    <span className={disabled ? classes.disabledButtonText : classes.enabledButtonText}>
      {label}
    </span>
  </button>
  
export default enhancer(Button)
```

Using `react-variants` can simplify this code and make it much more extensible:

```js
const theme = {
  button: {
    enabled: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 2,
      textColor: 'black',
      disabled: false
    },
    disabled: {
      backgroundColor: '#aaa',
      borderColor: '#555',
      borderStyle: 'dashed',
      borderWidth: 2,
      textColor: '#555',
      disabled: true
    }
  }
}j
```
```js
const mapVariantToStyles = variant => ({
  button: {
    border: {
      color: variant.borderColor,
      style: variant.borderStyle,
      width: variant.borderWidth
    },
    backgroundColor: variant.backgroundColor
  },
  buttonText: {
    color: variant.textColor
  }
})
```
```js
const mapVariantToProps = ({disabled}) => ({disabled})
```
```js
const enhancer = configureVariants({
  themePath: 'button',
  variantConfigs: [{
    propName: 'visualState',
    allowedVariants: ['enabled', 'disabled'],
    mapVariantToStyles,
    mapVariantToProps
  }],
})

const Button = ({classes, disabled, label, ...rest}) =>
  <button
    className={classes.button}
    disabled={disabled}
    {...rest}
  >
    <span className={classes.buttonText}>
      {label}
    </span>
  </button>
  
export default enhancer(Button)

```
```jsx harmony
<div>
  <Button visualState='enabled' label='Click me' />
  
  <Button visualState='disabled' label='Disabled button' />
</div>
```
