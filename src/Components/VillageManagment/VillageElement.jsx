import React from 'react'
import MyButton from '../SharedComponents/MyButton'

export default function VillageElement({ id, villageName, regionDistrict, admin, viewFn,updateFn,deleteFn,updateDFn}) {
	return (
		<>
			{(admin == true) ? (
				<div id={id} className="village">
					<div className="villageName">{villageName + " - " + regionDistrict}</div>
					<div className="btnsToShowData">
						<MyButton value={'View'} btnFn={()=>viewFn(id)}/>
						<MyButton value={'Update Village'} btnFn={()=>updateFn(id)} />
						<MyButton value={'Delete Village'} btnFn={()=>deleteFn(id)} />
						<MyButton value={'Update Demographic Data'} btnFn={()=>updateDFn(id)}/>
					</div>
				</div>
			) : (
				<div id={id} className="village">
					<div className="villageName">{villageName + " - " + regionDistrict}</div>
					<div className="btnsToShowData">
						<MyButton value={'View'} btnFn={()=>viewFn(id)}/>
					</div>
				</div>
			)}
		</>
	)
}
