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

export const villagesGQL = gql`
  query ExampleQuery {
    villages {
      id
      villageName
      regionDistrict
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
