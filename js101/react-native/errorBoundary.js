class ErrorBoundary extends Component {
  state = {hasError: false, error: null, errorInfo: null};

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }

  refresh = () => {
    const {refresh} = this.props;
    if (refresh) {
      this.setState({hasError: false, error: null, errorInfo: null})
      refresh();
    }
  }


  render() {
    if (this.state.hasError) {
      return (
        <View style={[styles.container]}>
          <Text style={[styles.loadText]}>程序出小差了~</Text>
          <View style={[styles.row]}>
            <FocusableView style={[styles.button, {marginRight: 16}]}
                           onPress={this.refresh}><Text>刷新</Text></FocusableView>
            <FocusableView style={[styles.button]} onPress={goHome}><Text>返回主界面</Text></FocusableView>
          </View>
          <View style={[styles.content]}>
            <Text style={[styles.errorText]}>错误原因:{this.state.error && this.state.error.toString()}}</Text>
          </View>
        </View>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
