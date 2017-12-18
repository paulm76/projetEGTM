import React from 'react';


class TeamMembers extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    console.log(this.props.idadmin);
    
    const placeStyle = {
      position: 'relative',
      left:'-20px'
    }
    const iconStyle = {
      width:'50px',
      height:'50px'
    }
    var libres = []
    for (var i = 0; i < this.props.libres; i++){
      libres.push(i)
    };
    return (
      <div style={{width: this.props.width, margin: 'auto', display:'flex'}}>
        {this.props.members.map(member =>
          <span style={{flexBasis:'auto'}}><svg width={64*this.props.ratio} height={84*this.props.ratio}>
          <defs>
            <pattern id={`image${member.id}`} x="0" y="0" height="100%" width="100%">
              <image x="0" y="0" height={`${46*this.props.ratio}px`} width={`${46*this.props.ratio}px`} href={member.avatar} ></image>
            </pattern>
          </defs>
          <circle id='avatar' cx={30*this.props.ratio} cy={30*this.props.ratio} r={23*this.props.ratio} fill={`url(#image${member.id})`} stroke="#494949" stroke-width="2"/>
          {member.id==this.props.idadmin && <text x={40*this.props.ratio} y={26*this.props.ratio} stroke="white" stroke-width={1.5*this.props.ratio} fill="#ffd000"  style={{fontSize:32*this.props.ratio}}>★</text>}
            {member.places>1 && <svg><circle cx={52*this.props.ratio} cy={44*this.props.ratio} r={11*this.props.ratio} fill="#0073ad" stroke="white" stroke-width={3*this.props.ratio} />
           <text x={44*this.props.ratio} y={48*this.props.ratio} fill="white" style={{fontSize:13*this.props.ratio, fontWeight:'bold'}}>+{member.places-1}</text></svg>}
          {this.props.text && <text x={33*this.props.ratio} y={70*this.props.ratio} text-anchor="middle" fill="#494949" style={{fontSize:13*this.props.ratio, textAlign:'center', fontWeight:500}}>{member.Prenom}  {member.Nom.substring(0,1)}.</text>}
          </svg></span>)}

          <span>{this.props.libres && <span style={{ display: 'flex' }}>{libres.map((i)=>
            <svg width={64*this.props.ratio} height={84*this.props.ratio} style={{flexBasis:'auto'}}>
          <defs>
            <pattern id="image0" x="0" y="0" height="100%" width="100%">
              <image x="0" y="0" height={`${46*this.props.ratio}px`} width={`${46*this.props.ratio}px`} href="http://etumed.unige.ch/files/6814/5761/4761/userneutre.png"></image>
            </pattern>
          </defs>
          <circle id='avatar' cx={30*this.props.ratio} cy={30*this.props.ratio} r={23*this.props.ratio} fill="url(#image0)" stroke="gray" stroke-width="2" stroke-dasharray="2.5,3.5"/>
          {this.props.text && <text x={33*this.props.ratio} y={70*this.props.ratio} text-anchor="middle" fill="gray" style={{fontSize:13*this.props.ratio, textAlign:'center', fontWeight:500}}>Place libre</text>}
          </svg>)} </span>}</span>
      </div>
    );
  }
}

export default TeamMembers;