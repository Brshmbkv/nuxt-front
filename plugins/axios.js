export default function({$axios}) {
  $axios.onError(err => {
    console.log(err)
  })
}