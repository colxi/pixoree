import React from 'react'

type Props = {
  width: number
  height: number
  id?: string
  className?: string
  willReadFrequently?: boolean
  contextRef: (a: CanvasRenderingContext2D | null) => void
  onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => void
  onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => void
  onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => void
  onMouseOut?: (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => void
  onClick?: (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => void
  onContextMenu?: (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => void
  onWheel?: (e: React.WheelEvent<HTMLCanvasElement> | WheelEvent) => void
}

/**
 * 
 * This Canvas is NOT re-rendered when the parent component is rerendered, except when the 
 * props 'width' or 'height' changes.
 * 
 */
export class PersistentPixelatedCanvas extends React.Component<Props> {
  public constructor(props: Props) {
    super(props)
    this.canvasRef = null
  }

  public static defaultProps = {
    className: 'PersistentPixelatedCanvas',
    willReadFrequently: false
  }

  /** 
   * 
   * Track mouseUp event on the document and treat it as a mouseUp event on the canvas
   * 
   */
  public componentDidMount(): void {
    document.addEventListener('mouseup', this.handleOnMouseUp)
  }

  /**
   * 
   * Remove the document mouseUp event listener
   * 
   */
  public componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOnMouseUp)
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
  public shouldComponentUpdate(newProps: Props) {
    if (newProps.width !== this.props.width || newProps.height !== this.props.height) return true
    return false
  }

  /**
   * 
   * After component updated expose the canvas context to the parent component
   * 
   */
  public componentDidUpdate(): void {
    this.configureAndPropagateContext()
  }

  public handleOnMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onMouseDown) this.props.onMouseDown(e)
  }

  public handleOnMouseUp = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | MouseEvent) => {
    if (this.props.onMouseUp) this.props.onMouseUp(e)
  }

  public handleOnMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onMouseMove) this.props.onMouseMove(e)
  }

  public handleOnMouseOut = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onMouseOut) this.props.onMouseOut(e)
  }

  public handleOnClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onClick) this.props.onClick(e)
  }

  public handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (this.props.onContextMenu) this.props.onContextMenu(e)
  }

  public handleOnWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (this.props.onWheel) this.props.onWheel(e)
  }

  public render() {
    return (
      // Render as "block" to prevent extra 5px at the bottom
      // Details: https://stackoverflow.com/questions/15807833/div-containing-canvas-have-got-a-strange-bottom-margin-of-5px
      <canvas
        className={this.props.className}
        height={this.props.height}
        id={this.props.id}
        ref={this.setCanvasRef}
        style={{ display: 'block' }}
        width={this.props.width}
        onClick={this.handleOnClick}
        onContextMenu={this.handleContextMenu}
        onMouseDown={this.handleOnMouseDown}
        onMouseMove={this.handleOnMouseMove}
        onMouseOut={this.handleOnMouseOut}
        onMouseUp={this.handleOnMouseUp}
        onWheel={this.handleOnWheel}
      />
    )
  }
}
