let n,n1,n2,n3,n4,n5;navigator&&((null===(n=navigator)||void 0===n?void 0:n.vendor.toLowerCase().indexOf("apple"))!==-1||(null===(n1=navigator)||void 0===n1?void 0:n1.userAgent.match(/safari/i))!==null&&(null===(n2=navigator)||void 0===n2?void 0:n2.userAgent.match(/chrome/i))===null||/iPhone|iPad|iPod/i.test((null===(n3=navigator)||void 0===n3?void 0:n3.userAgent)||(null===(n4=navigator)||void 0===n4?void 0:n4.vendor))||["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(null===(n5=navigator)||void 0===n5?void 0:n5.platform))&&this.setState({showInstallMessage:!0});