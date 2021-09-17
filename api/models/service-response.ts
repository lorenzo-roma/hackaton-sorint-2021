

interface ServiceResponse<T, V = null> {
    status: T,
    data?: V
}