from numpy.lib.function_base import append
from sage.all import *
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import glob
import os


def generate_coefficients_dict(number):
    i = 0
    coefficient_data = {}
    while i < number:
        rng = np.random.default_rng()
        # rng = np.random.default_rng(seed=i)
        i += 1
        coefficients = rng.integers(low=1, high=100, size=4).tolist()

        coefficients.append(0)
        e = EllipticCurve(coefficients)

        coefficient_data[e.conductor()] = coefficients

        i = len(coefficient_data)

    return coefficient_data


def plot_eliptic_curve(coefficient_data):
    coefficients = coefficient_data[1]
    conductor = coefficient_data[0]

    y, x = np.ogrid[-50000:50000:100j, -1000:1000:100j]
    # y^2 + (c0 * xy) + (c2 * y) - x^3 - (c1 * x^2) - (c3 * x)
    contour = pow(y, 2) + coefficients[0] * x * y + coefficients[2] * y - pow(
        x, 3) - coefficients[1] * pow(x, 2) - x * coefficients[3]
    plt.contour(x.ravel(), y.ravel(), contour, [0])
    plt.axis('off')
    plt.figure(figsize=(19.20, 10.80))

    plt.savefig(f'../../assets/curves/{conductor}.png', transparent=True)
    plt.close()


# Run once before saving all eliptic curve plots
def clear_curves_folder():
    print("removing")
    folder = '../../assets/curves/*.png'
    files = glob.glob(folder)
    f = os.listdir(folder)
    print(f)
    if len(f) > 0:
        for f in files:
            try:
                os.remove(f)
            except OSError as e:
                print("Error: %s : %s" % (f, e.strerror))


def build_up_metadata(coefficient_data_dict):
    metadata = []
    for key in coefficient_data_dict:
        coefficients = coefficient_data_dict[key]

        background = background_picker(coefficients[0])

        mathematician = mathematician_picker(coefficients[1])

        clear_curves_folder()
        # TODO: Build up image from layers

        metadata.append({"background": background, "group": mathematician,
                         "c1": coefficients[0], "c2": coefficients[1]})

    print(metadata)


def background_picker(number):
    if number < 15:
        return "waveform"
    elif number < 40:
        return "graph paper"
    elif number < 60:
        return "diamond"
    elif number < 70:
        return "blue"
    elif number < 80:
        return "black hole"
    elif number < 85:
        return "diagonal"
    elif number < 90:
        return "radial"
    elif number < 97:
        return "stripes"
    elif number <= 100:
        return "gold"


def mathematician_picker(number):
    if number < 2:
        return "Ramanujan"
    elif number < 3:
        return "Pythagoras"
    elif number < 4:
        return "Hawking"
    elif number < 5:
        return "Fibonacci"
    elif number < 7:
        return "Newton"
    elif number < 9:
        return "Euclid"
    elif number < 11:
        return "Ptolemy"
    elif number < 13:
        return "Gauss"
    elif number < 15:
        return "Galileo"
    elif number < 18:
        return "Euler"
    elif number < 21:
        return "Al-Khwarizmi"
    elif number < 22:
        return "Cardan"
    elif number < 23:
        return "McAfee"
    elif number < 24:
        return "Diophantus"
    elif number < 25:
        return "Nash"
    elif number < 27:
        return "Kepler"
    elif number < 31:
        return "Hypatia"
    elif number < 34:
        return "Archimedes"
    elif number < 39:
        return "Leibniz"
    elif number < 40:
        return "Feynman"
    elif number < 41:
        return "Napier"
    elif number < 42:
        return "Tao"
    elif number < 43:
        return "Cantor"
    elif number < 45:
        return "Katherine Johnson"
    elif number < 50:
        return "Riemann"
    elif number < 53:
        return "Al-Biruni"
    elif number < 58:
        return "Pascal"
    elif number < 63:
        return "Descartes"
    elif number < 67:
        return "von Neumann"
    elif number < 73:
        return "Aristotle"
    elif number < 75:
        return "Dodgson"
    elif number < 79:
        return "Eratosthenes"
    elif number < 83:
        return "Lagrange"
    elif number < 84:
        return "Germain"
    elif number < 85:
        return "Copernicus"
    elif number < 86:
        return "Fourier"
    elif number < 87:
        return "Einstein"
    elif number < 88:
        return "Hilbert"
    elif number < 89:
        return "Avicenna"
    elif number < 90:
        return "Al-Haytham"
    elif number < 91:
        return "Pacioli"
    elif number < 92:
        return "Thales"
    elif number < 93:
        return "Galois"
    elif number < 94:
        return "Wiles"
    elif number < 95:
        return "Erdős"
    elif number < 96:
        return "Laplace"
    elif number < 97:
        return "Brahmagupta"
    elif number < 98:
        return "Fermat"
    elif number < 99:
        return "Plato"
    elif number <= 100:
        return "Somerville"


if __name__ == "__main__":
    coefficients_dict = generate_coefficients_dict(5)

    # build_up_metadata(coefficients)

    print(coefficients_dict)
    clear_curves_folder()

    for key in coefficients_dict:
        plot_eliptic_curve((key, coefficients_dict[key]))
