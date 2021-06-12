// 每个参数的默认实现
const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  // 需要store中的state才会去监听
  const shouldSubscribe = Boolean(mapStateToProps)
  // 更新state 方法的兼容，无mapStateToProps则使用默认
  const mapState = mapStateToProps || defaultMapStateToProps

  let mapDispatch
  // action creater是否为 函数
  if (typeof mapDispatchToProps === 'function') {
    // 函数直接赋值
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    // 不存在，则使用默认方法
    mapDispatch = defaultMapDispatchToProps
  } else {
    // 否则 将action Creater 包装起来
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  const finalMergeProps = mergeProps || defaultMergeProps
  const { pure = true, withRef = false } = options
  const checkMergedEquals = pure && finalMergeProps !== defaultMergeProps
  function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`
    class Connect extends Component {/****/ }
    // ****
    return hoistStatics(Connect, WrappedComponent)
  }
}