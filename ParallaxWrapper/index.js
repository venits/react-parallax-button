import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default class ParallaxWrapper extends Component {

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

      this.div.style.setProperty('--rx', `${ (-dy / 2) * this.props.parallaxScale }deg`);
      this.div.style.setProperty('--ry', `${ (dx / 4) * this.props.parallaxScale }deg`);

      this.update = 0;
    }
    this.update++;
  };

  onMouseLeave = () => {
    this.div.style.setProperty('--ty', '0');
    this.div.style.setProperty('--rx', '0');
    this.div.style.setProperty('--ry', '0');
  };

  render() {
    return (
      <div
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        className={css(this.styles.static)}
      >
        <div
          ref={ref => this.div = ref}
          className={css(this.styles.wrap)}
        >
          {this.props.children}
        </div>
      </div>

    )
  }

  defineStyles = (props) => {
    this.styles = StyleSheet.create({
      static: {
        position: 'relative',
        display: 'inline-block',
      },
      wrap: {
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        transition: 'transform .2s linear',
        willChange: 'transform',
        transform: 'translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -1em))',
      }
    });
  }
}

ParallaxWrapper.propTypes = {
  parallaxScale: PropTypes.number,
};

ParallaxWrapper.defaultProps = {
  parallaxScale: 1,
};