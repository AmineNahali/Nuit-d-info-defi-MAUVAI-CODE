var display = document.getElementById('display');

class ClasseNonNecessaire {
    constructor(a,b) {
        this.a = a;
        this.b = b;
    }

    mauvaise_addition() {
        var a = this.a;
        var b = this.b;
        const scale = Math.pow(10, Math.max(
            (`${a}`.split('.')[1] || '').length,
            (`${b}`.split('.')[1] || '').length
        ));

        const intA = Math.round(a * scale);
        const intB = Math.round(b * scale);

        const result = intA + intB;

        return result / scale;
    }

    mauvaise_multiplication() {
        var a = this.a;
        var b = this.b;

        const scaleA = Math.pow(10, (`${a}`.split('.')[1] || '').length);
        const scaleB = Math.pow(10, (`${b}`.split('.')[1] || '').length);

        const intA = Math.round(a * scaleA);
        const intB = Math.round(b * scaleB);

        const result = Array(Math.abs(intB))
            .fill(Math.abs(intA))
            .reduce((acc, curr) => acc + curr, 0) * (Math.sign(a) * Math.sign(b));

        return result / (scaleA * scaleB);
    }

    mauvaise_soustraction() {
        var a = this.a;
        var b = this.b;

        const scale = Math.pow(10, Math.max(
            (`${a}`.split('.')[1] || '').length,
            (`${b}`.split('.')[1] || '').length
        ));

        const intA = Math.round(a * scale);
        const intB = Math.round(b * scale);

        const result = intA - intB;

        return result / scale;
    }

    mauvaise_division() {
        var a = this.a;
        var b = this.b;

        const isNegativeResult = Math.sign(a) !== Math.sign(b);
        let absA = Math.abs(a);
        let absB = Math.abs(b);

        let scale = Math.pow(10, Math.max(
            (`${a}`.split('.')[1] || '').length,
            (`${b}`.split('.')[1] || '').length
        ));

        absA = Math.round(absA * scale);
        absB = Math.round(absB * scale);

        let result = 0;
        let currentA = absA;

        while (currentA >= absB) {
            currentA -= absB;
            result++;
        }

        let decimalPart = 0;
        let decimalPlaces = 0;

        while (decimalPlaces < 10) {
            currentA *= 10;
            decimalPart = Math.floor(currentA / absB);
            currentA = currentA % absB;
            decimalPlaces++;
            result += decimalPart / Math.pow(10, decimalPlaces);
        }

        if (isNegativeResult) {
            result = -result;
        }

        return result / scale;
    }
}

function appendValue(value) {
    display.value += value;
}

function appendOperator(operator) {
    display.value += ` ${operator} `;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        const tokens = display.value.split(' ');
        let result = parseFloat(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const nextValue = parseFloat(tokens[i + 1]);

            switch (operator) {
                case '+':
                    result = add(result, nextValue);
                    break;
                case '-':
                    result = subtract(result, nextValue);
                    break;
                case '*':
                    result = multiply(result, nextValue);
                    break;
                case '/':
                    result = divide(result, nextValue);
                    break;
                default:
                    throw new Error('OPERATEUR INVALIDE');
            }
        }

        display.value = result;
    } catch {
        display.value = 'ERREUR';
    }
}

function add(a, b) {
    var objet_non_necessaire1 = new ClasseNonNecessaire(a,b);
    return objet_non_necessaire1.mauvaise_addition();
}

function subtract(a, b) {
    var objet_non_necessaire2 = new ClasseNonNecessaire(a,b);
    return objet_non_necessaire2.mauvaise_soustraction();
}

function multiply(a, b) {
    var objet_non_necessaire3 = new ClasseNonNecessaire(a,b);
    return objet_non_necessaire3.mauvaise_multiplication();
}

function divide(a, b) {
    if (b === 0) {
        return 'ERREUR';
    }
    var objet_non_necessaire4 = new ClasseNonNecessaire(a,b);
    return objet_non_necessaire4.mauvaise_division();
}













bg=0;
totbg=7;
bgp=0;
x=0;
y=0;
bgdist=1200;
chbg();
mvbg();

async function chbg() {
    while(true) {
        //Begin transition
        document.body.style.backgroundImage = "url('images/tiles/"+`${bg}`.toString()+".bmp')";
        bg ++;
        if (bg == totbg+1) {bg = 0;}
        await sleep(6000);
    }
}

async function mvbg() {
    while(true) {
        bgp++;
        if(bgp <= (bgdist/6)){x++;y++;}
        if(bgp >(bgdist/6) && bgp <= (bgdist/6)*2){x++;}
        if(bgp >(bgdist/6)*2 && bgp <= (bgdist/6)*3){x++;y--;}
        if(bgp >(bgdist/6)*3 && bgp <= (bgdist/6)*4){x--;y--;}
        if(bgp >(bgdist/6)*4 && bgp <= (bgdist/6)*5){x--;}
        if(bgp >(bgdist/6)*5 && bgp < bgdist){x--;y++;}
        if(bgp == bgdist){bgp =0;}
        document.body.style.backgroundPosition = `${x}px ${y}px`.toString();
        await sleep(30);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
