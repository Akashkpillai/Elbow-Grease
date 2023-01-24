import axiox from 'axios'

export default axiox.create({
    baseURL:'http://localhost:3500',
})

export const expertAxios = axiox.create({
    baseURL:'http://localhost:3500/expert'
})
