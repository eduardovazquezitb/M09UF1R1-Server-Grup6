export function handleHttpResult (res, result) {
  if (!result.status) {
    res.status(result.error).send(result.message)
  } else {
    res.json(result.data)
  }
}
