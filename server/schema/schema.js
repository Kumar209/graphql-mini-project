const { projects , clients } = require("../sample");

const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

//GraphQLObjectType is used create a object type of graphql
//Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},

        //In below you have setup relationship between client and project
        client: {
            type: ClientType,
            resolve(parent, args){
                return clients.find(client => client.id === parent.clientId);  //clientId is present in porject array of smaple data
            }
        }
    })
});


//Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});

//To query any client details
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                //sample data projects
                return projects;
            }
        },

        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return projects.find(project =>project.id === args.id);
            }
        },


        clients: {
            //GraphQLList is used because we are returning the object of sample data, used for objects, array data
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return clients;
            }
        },

        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})