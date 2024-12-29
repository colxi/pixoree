import React from 'react'

interface Props {
  width: number
  height: number
  id?: string
  className?: string
  willReadFrequently?: boolean
  contextRef: (a: CanvasRenderingContext2D | null) => void
  onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseOut?: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onWheel?: (e: React.WheelEvent<HTMLCanvasElement>) => void
  onClick?: (e: React.MouseEvent<HTMLCanvasElement>) => void
  onContextMenu?: (e: React.MouseEvent<HTMLCanvasElement>) => void
}

/**
 * 
 * This Canvas is NOT re-rendered when the parent component is rerendered, except when the 
 * props 'width' or 'height' changes.
 * 
 */
export class PersistentPixelatedCanvas extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.canvasRef = null
  }

  static defaultProps = {
    className: 'PersistentPixelatedCanvas',
    willReadFrequently: false
  }

  /** 
   * 
   * Hold a reference to the canvas element
   * 
   */
  private canvasRef: HTMLCanvasElement | null

  /**
   * 
   * Set the canvas reference (onMount), and propagate the context to the parent component
   * 
   */
  private setCanvasRef = (ref: HTMLCanvasElement | null = null) => {
    this.canvasRef = ref
    this.configureAndPropagateContext()
  }

  /**
   * 
   * Configure the canvas context and propagate it to the parent component
   * 
   */
  private configureAndPropagateContext = () => {
    if (!this.canvasRef) return
    const context = this.canvasRef.getContext('2d', { willReadFrequently: this.props.willReadFrequently })
    if (!context) throw new Error('[PersistentPixelatedCanvas]: Canvas 2d context not found')
    context.imageSmoothingEnabled = false
    this.props.contextRef(context)
  }

  /**
   * 
   * Only update the component then canvas dimensions have changed
   * 
   */
  shouldComponentUpdate(newProps: Props) {
    if (newProps.width !== this.props.width || newProps.height !== this.props.height) return true
    return false
  }

  /**
   * 
   * After component updated expose the canvas context to the parent component
   * 
   */
  componentDidUpdate(): void {
    this.configureAndPropagateContext()
  }

  handleOnMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onMouseDown) this.props.onMouseDown(e)
  }

  handleOnMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onMouseUp) this.props.onMouseUp(e)
  }

  handleOnMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onMouseMove) this.props.onMouseMove(e)
  }

  handleOnMouseOut = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onMouseOut) this.props.onMouseOut(e)
  }

  handleOnClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onClick) this.props.onClick(e)
  }

  handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onContextMenu) this.props.onContextMenu(e)
  }

  handleOnWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (this.props.onWheel) this.props.onWheel(e)
  }

  render() {
    return (
      <canvas
        id={this.props.id}
        className={this.props.className}
        width={this.props.width}
        height={this.props.height}
        ref={this.setCanvasRef}
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseMove={this.handleOnMouseMove}
        onMouseOut={this.handleOnMouseOut}
        onWheel={this.handleOnWheel}
        onClick={this.handleOnClick}
        onContextMenu={this.handleContextMenu}
        // Render as "block" to prevent extra 5px at the bottom
        // Details: https://stackoverflow.com/questions/15807833/div-containing-canvas-have-got-a-strange-bottom-margin-of-5px
        style={{ display: 'block' }}
      />
    )
  }
}
