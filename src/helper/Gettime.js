export const Gettime=(time)=>{
return new Date(time).toLocaleString('en-US', { hour: 'numeric', hour12: true ,minute:'2-digit' })
}
