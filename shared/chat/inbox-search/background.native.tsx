import * as React from 'react'
import * as Kb from '../../common-adapters'
import * as Styles from '../../styles'

const Rover = () => (
  <Kb.Box2 direction="vertical" style={styles.container}>
    <Kb.Icon
      style={styles.background}
      type={Kb.Icon.makeFastType(Kb.IconType.icon_illustration_mars_rover_background)}
    />
    <Kb.Icon style={styles.rover} type={Kb.Icon.makeFastType(Kb.IconType.icon_illustration_mars_rover)} />
    <Kb.Icon
      style={styles.foreground}
      type={Kb.Icon.makeFastType(Kb.IconType.icon_illustration_mars_rover_foreground)}
    />
  </Kb.Box2>
)

const common = {
  bottom: 0,
  left: 0,
  position: 'absolute',
} as const

const styles = Styles.styleSheetCreate(
  () =>
    ({
      background: {...common, bottom: 10},
      container: common,
      foreground: common,
      rover: {
        ...common,
        bottom: 80,
        left: Styles.dimensionWidth - 50,
      },
    } as const)
)

export default Rover
