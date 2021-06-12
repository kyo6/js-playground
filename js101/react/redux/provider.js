import { Component, Children } from "react";
export default class Provider extends Component {
  // 声明context 以被子组件获取。
  getChildContext() {
    return { store: this.store };
  }

  constructor(props, context) {
    super(props, context);
    // 挂载store到Provider
    this.store = props.store;
  }

  render() {
    // 判断是否只有一个child，是则返回该child节点，否则抛错
    return Children.only(this.props.children);
  }
}
