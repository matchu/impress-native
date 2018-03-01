import React from "react";

import ClosetMain from "./ClosetMain";
import ClosetSearch from "./ClosetSearch";

export default class Closet extends React.PureComponent {
    state = { tab: "main" };

    _goToSearch = () => {
        this.setState({ tab: "search" });
    };

    _goToMain = () => {
        this.setState({ tab: "main" });
    };

    render() {
        if (this.state.tab === "main") {
            return <ClosetMain {...this.props} onSearch={this._goToSearch} />;
        } else if (this.state.tab === "search") {
            return <ClosetSearch {...this.props} onExit={this._goToMain} />;
        } else {
            throw new Error(`unexpected tab ${this.state.tab}`);
        }
    }
}
