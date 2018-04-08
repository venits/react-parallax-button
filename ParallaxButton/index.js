import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const propsToFilter = ['text', 'parallaxScale', 'backgroundStyle', 'textStyle'];

export default class ParallaxButton extends Component {

  constructor(props) {
    super(props);
    this.update = 6;
    this.defineStyles(props);
  }

  componentDidMount(){

    setTimeout(()=> {
      this.boundingRect = this.div.getBoundingClientRect();
      this.top = this.boundingRect.top + window.pageYOffset;
    });
  }

  onMouseMove = (e) => {
    if(this.update === 6) {

      const dx = (e.clientX - this.boundingRect.left) - (this.boundingRect.width / 2);
      const dy = (e.clientY - (this.top - window.pageYOffset)) - (this.boundingRect.height / 2);

      this.div.style.setProperty('--rx', `${ (-dy / 0.85) * this.props.parallaxScale }deg`);
      this.div.style.setProperty('--ry', `${ (dx / 4) * this.props.parallaxScale }deg`);

      this.update = 0;
    }
    this.update++;
  };

  onMouseDown = () => {
    this.div.style.setProperty('--tz', '-2.5em');
  };

  onMouseUp = () => {
    this.div.style.setProperty('--tz', '-1em');
  };

  onMouseLeave = () => {
    this.div.style.setProperty('--ty', '0');
    this.div.style.setProperty('--rx', '0');
    this.div.style.setProperty('--ry', '0');
  };

  filterProps = (props) => {
    const newProps = {};

    Object.keys(props).forEach(key => {
      if(!propsToFilter.includes(key)) {
        newProps[key] = props[key];
      }
    });

    return newProps;
  };

  render() {
    return (
      <div
        {...this.filterProps(this.props)}
        ref={ref => this.div = ref}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        className={css(this.styles.button)}
      />
    )
  }

  defineStyles = (props) => {
    this.styles = StyleSheet.create({
      button: {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        ...this.props.textStyle,

        ':before': {
          content: "''",
          position: 'absolute',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          transition: 'transform .2s linear',
          willChange: 'transform',
          transform: 'translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -1em))',
          ...this.props.backgroundStyle,
        },

        ':after': {
          position: 'relative',
          display: 'inline-block',
          content: `'${this.props.text}'`,
          transition: 'transform .2s linear',
          willChange: 'transform',
          transform: 'translateY(var(--ty, 0))rotateX(var(--rx, 0))rotateY(var(--ry, 0))',
        }
      }
    });
  }
}

ParallaxButton.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundStyle: PropTypes.object,
  parallaxScale: PropTypes.number,
};

ParallaxButton.defaultProps = {
  parallaxScale: 1,
  backgroundStyle: { background: 'linear-gradient(left, #FC5C7D, #6A82FB)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, .3)' },
  textStyle: { padding: '1.5em 2.5em 1.5em 2.5em', color: 'white', fontSize: '16px' },
};
