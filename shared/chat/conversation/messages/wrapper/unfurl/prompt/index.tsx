import * as React from 'react'
import * as Kb from '../../../../../../common-adapters/index'
import * as Styles from '../../../../../../styles'

export type Props = {
  domain: string
  onAlways: () => void
  onAccept: () => void
  onOnetime: () => void
  onNotnow: () => void
  onNever: () => void
}

const promptIcon = Styles.isMobile
  ? Kb.Icon.makeFastType(Kb.IconType.icon_fancy_unfurl_preview_mobile_128_128)
  : Kb.Icon.makeFastType(Kb.IconType.icon_fancy_unfurl_preview_desktop_96_96)

class UnfurlPrompt extends React.PureComponent<Props> {
  render() {
    return (
      <Kb.Box2 direction="horizontal" style={styles.container} fullWidth={true}>
        {!Styles.isMobile && <Kb.Icon type={promptIcon} style={styles.icon} />}
        <Kb.Box2 direction="vertical" style={styles.choiceContainer} gap="xtiny">
          <Kb.Box2 direction="vertical" fullWidth={true}>
            <Kb.Text type="BodySemibold">Would you like to post a preview?</Kb.Text>
            <Kb.Text type="Body">Your Keybase app will visit the link and post a preview of it.</Kb.Text>
          </Kb.Box2>
          <Kb.Text onClick={this.props.onAlways} type="BodyPrimaryLink">
            Always, for any site
          </Kb.Text>
          <Kb.Text onClick={this.props.onAccept} type="BodyPrimaryLink">
            Always, for {this.props.domain}
          </Kb.Text>
          <Kb.Text onClick={this.props.onOnetime} type="BodyPrimaryLink">
            Yes, but ask me again for {this.props.domain}
          </Kb.Text>
          <Kb.Text onClick={this.props.onNotnow} type="BodyPrimaryLink">
            Not now
          </Kb.Text>
          <Kb.Text onClick={this.props.onNever} type="BodyPrimaryLink">
            Never, for any site
          </Kb.Text>
        </Kb.Box2>
        <Kb.Box2 direction="horizontal" style={styles.closeContainer}>
          <Kb.Icon
            type={Kb.Icon.makeFastType(Kb.IconType.iconfont_close)}
            onClick={this.props.onNotnow}
            fontSize={16}
            padding="xtiny"
          />
        </Kb.Box2>
      </Kb.Box2>
    )
  }
}

const styles = Styles.styleSheetCreate(
  () =>
    ({
      choiceContainer: Styles.platformStyles({
        isElectron: {
          width: 370,
        },
      }),
      closeContainer: Styles.platformStyles({
        common: {
          alignSelf: 'flex-start',
        },
        isElectron: {
          marginLeft: 'auto',
          width: 30,
        },
      }),
      container: Styles.platformStyles({
        common: {
          ...Styles.globalStyles.flexBoxRow,
          alignSelf: 'flex-start',
          backgroundColor: Styles.globalColors.blueLighter3,
          borderRadius: Styles.borderRadius,
          paddingBottom: Styles.globalMargins.tiny,
          paddingTop: Styles.globalMargins.tiny,
        },
        isElectron: {
          maxWidth: 600,
        },
      }),
      icon: Styles.platformStyles({
        isElectron: {
          alignSelf: 'center',
          marginLeft: Styles.globalMargins.small,
          marginRight: Styles.globalMargins.small,
        },
      }),
    } as const)
)

export default UnfurlPrompt
