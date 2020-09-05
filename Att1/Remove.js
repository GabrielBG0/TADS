function pegaMenor(array) {
    if (array.length === 1) {
        return array[0]
    } else {
        if (array[0] < array[1]) {
            array[1] = array[0]
            return pegaMenor(array.slice(1))
        } else {
            return pegaMenor(array.slice(1))
        }
    }
}

function removeOcorrencia(array, procurado) {
    if (array.length === 0) {
        return []
    }
    else if (array[0] === procurado) {
        return array.slice(1)
    }
    else {
        var aux = removeOcorrencia(array.slice(1), procurado)
        aux.unshift(array[0])
        return aux
    }
}

// RGA: 201819060292
console.log(pegaMenor([2, 0, 1, 8, 1, 9, 0, 6, 0, 2, 9, 2]))
console.log(removeOcorrencia([2, 0, 1, 8, 1, 9, 0, 6, 0, 2, 9, 2], 9))