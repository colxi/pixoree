type FrameRequestCallback = (time: number) => void
export class AnimationEngine {
  public constructor(instanceId: string) {
    this.instanceId = instanceId
    this.requestAnimationFrameId = -1
    console.log(`[AnimationEngine]: Start instance '${instanceId}'`)
  }

  private requestAnimationFrameId: number
  private instanceId: string

  public requestFrame(callback: FrameRequestCallback) {
    cancelAnimationFrame(this.requestAnimationFrameId)
    this.requestAnimationFrameId = requestAnimationFrame(callback)
  }

  public stop() {
    console.log(`[AnimationEngine]: Stop instance '${this.instanceId}'`)
    cancelAnimationFrame(this.requestAnimationFrameId)
  }
}

export class FramerateMonitor {
  public constructor() {
    this.animationEngine = new AnimationEngine('fpsMonitor')
    this.fpsHistory = []
    this.lastTime = 0
    this.tick = this.tick.bind(this)
  }

  private animationEngine: AnimationEngine
  private fpsHistory: number[]
  private lastTime: number

  private tick = (currentTime: number): void => {
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime
    let fps = 1 / deltaTime
    this.fpsHistory.push(fps)
    if (this.fpsHistory.length > 60) this.fpsHistory.shift()
    this.animationEngine.requestFrame(this.tick)
  }

  public getFPS(): number {
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0)
    const average = sum / this.fpsHistory.length
    return Number(average.toFixed(2))
  }

  public start(): void {
    this.tick(0)
  }

  public stop(): void {
    this.animationEngine.stop()
  }
}
