export default [
  {
    allowedVariants: ['go', 'stop'],
    defaultVariant: 'go',
    mapVariantToStyles: v => ({
      button: {
        backgroundColor: v.backgroundColor
      },
      buttonText: {
        color: v.color
      }
    }),
    mapVariantToProps: v => ({
      style: {
        backgroundColor: v.backgroundColor
      },
      textStyle: {
        color: v.color
      }
    }),
    propName: 'activity'
  },
  {
    allowedVariants: ['left', 'right'],
    mapVariantToStyles: v => ({
      button: {
        textAlign: v.align
      },
      buttonIcon: {
        iconName: v.icon
      }
    }),
    mapVariantToProps: v => ({
      style: {
        textAlign: v.align
      },
      icon: v.icon
    }),
    propName: 'direction'
  }
]
