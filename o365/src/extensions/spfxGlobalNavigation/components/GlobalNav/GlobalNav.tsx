import * as React from "react";
import IGlobalNavItem from "./model/IGlobalNavItem";
import GlobalNavNode from "./GlobalNavNode";
import GlobalNavProvider from "./provider/GlobalNavProvider";
import * as $ from "jquery";

require("./globalNavStyles.scss");
let _image: string = require('../../../Images/Logo.png');

export interface IGlobalNavProps {
  webUrl?: string;
}

export interface IGlobalNavState {
  globalNavItems: IGlobalNavItem[];
}

export default class Header extends React.Component<
  IGlobalNavProps,
  IGlobalNavState
> {
  private globalNavProvider: GlobalNavProvider;

  constructor(props: IGlobalNavProps) {
    super(props);

    this.state = {
      globalNavItems: []
    };
  }

  public componentWillMount(): void {
    this.globalNavProvider = new GlobalNavProvider();
  }

  public componentDidMount(): void {
    $('#spCommandBar').hide();
    var paramVal = this._getParameterValues('Edit');
    if(paramVal){
      $('#spCommandBar').show();
    }else{
      $('#spCommandBar').hide();
    }
    $('#spSiteHeader').hide();
    $('.webPartContainer').hide();
    $('.ms-SPLegacyFabricBlock').css({
      'padding':'2px !important',
      'margin':'0px !important'
    })
    $('.CustomLinks').css('padding-right','880px');
    //$('.global-nav').parent('div').css('background-color','#3c5399');
    this.globalNavProvider
      .getGlobalNavigation()
      .then(
        (result: IGlobalNavItem[]): void => {
          this.setState({
            globalNavItems: result
          });
        }
      )
      .catch(error => {
        console.log(error);
      });
  }

  public render(): JSX.Element {
    return (
      <div className="global-nav row">
        <span style={{width:'124px'}}>
          <img style={{width:'80%',paddingLeft:'16px'}} src={_image} alt="Logo"/>
        </span>
        <ul className="gn-root">
          {this.state.globalNavItems.map(
            (globalNavItem: IGlobalNavItem, index: number) => (
              <GlobalNavNode key={index} globalNavItem={globalNavItem} />
            )
            )}
        </ul>
      </div>
    );
  }
  private _getParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('?');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
}
