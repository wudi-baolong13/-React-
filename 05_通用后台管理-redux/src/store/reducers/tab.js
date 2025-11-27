import{createSlice} from '@reduxjs/toolkit'

const tabSlice= createSlice({
    name:'tab',
    initialState:{
        isCollapse:false,
        tableList:{
            path:'',
            name:'home',
            label:'首页',
        }
    },
    reducers:{
        collapseMenu:state=>{
            state.isCollapse=!state.isCollapse
        },

        selectMenuList:(state,{payloda:val})=>{
            
        }
    }
})

export const {collapseMenu}=tabSlice.actions
export default tabSlice.reducer 