import { gql } from "graphql-request";

export function villageNameGQL(id) {
  return gql`
	query ExampleQuery {
		village(id: "${id}") {
		villageName
		}
	}
	`;
}

export const villagesGQL =(page,limit)=> gql`
  query ExampleQuery {
    villages(page:${page},limit:${limit}){
	villages{
      id
      villageName
      regionDistrict
	},count
    }
  }
`;

export function addVillageGQL(data) {
  return gql`
	mutation ExampleQuery{
		addVillage(
		villageName: "${data["Village Name"]}",
		regionDistrict:"${data["Region/District"]}",
		landArea:${data["Land Area (sq km)"]},
		latitude:${data["Latitude"]},
		longitude:${data["Longitude"]},
		tags:["${data["Categories/Tags"]}"],
		image:"hello.png"
	) {
		id
		}
	}
	`;
}
export function deleteVillageGQL(id) {
  return gql`
	mutation ExampleQuery{
		deleteVillage(
			id:"${id}"
		)
	}`;
}

export function viewVillageGQL(id) {
  return gql`
	query ExampleQuery {
		village(id: "${id}") {
		id
		villageName
		regionDistrict
		landArea
		latitude
		longitude
		image
		populationSize
		populationGrowthRate
		ageDistribution
		genderRatios
		}
	}
	`;
}

export function updateVillageGQL(id, data) {
  return gql`mutation ExampleQuery{
		updateVillage(
		id:"${id}",
		villageName: "${data["Village Name"]}",
		regionDistrict:"${data["Region/District"]}",
		landArea:${data["Land Area (sq km)"]},
		latitude:${data["Latitude"]},
		longitude:${data["Longitude"]},
		image:"hello.png"
	) {
		id
		}
	}
	`;
}

export function getStatGQL() {
	return gql`
	query ExampleQuery{
      getStatistics {
       totalPopSize,
       totalNumVillages,
       totalNumUrban,
       AgesArray,
       genderArray,
       avgLandArea,
		popArray {
        populationSize,
        villageName
       }
      }
    }`

}

export function updateDVillageGQL(id, data) {
  return gql`mutation ExampleQuery{
		updateVillage(
		id:"${id}",
		populationSize: ${data["Population Size"]},
		populationGrowthRate: ${data["Population Growth Rate"]},
		ageDistribution: [${data["Age Distribution"]}],
		genderRatios: [${data["Gender Ratios"]}]
	) {
		id
	  }
	}
	`;
}

export function userGQL(id) {
	return gql`
  query ExampleQuery {
    User(
	id:"${id}"
	){
		role
    }
  }
`;
}

export function addUserGQL(data) {
  return gql`
    mutation ExampleQuery {
      addUser(
        fullName:"${data.fullName}",
        username:"${data.username}",
        password: "${data.password}"
      ) {
        id
      }
    }
  `;
}

export function loginUserGQL(data) {
	return gql`
      mutation ExampleQuery{
      loginUser(
        username: "${data.username}",
        password: "${data.password}"
        ) {
		token,
		userId,
		userName
     }
    }
  `;
}

export function uploadImage(desc){
	return gql`
	 mutation(${file}: Upload!){
   		singleUpload(file: $file, desc:"${desc}"){
    	desc,
    	url
    	}
 	}
	`
}

