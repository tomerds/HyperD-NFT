from numpy.lib.function_base import append
from sage.all import *
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import glob
import os
from PIL import Image, ImageDraw, ImageFont
import requests
import json


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
    plt.contour(x.ravel(), y.ravel(), contour, [0], colors="black")
    plt.axis('off')

    plt.savefig(f'../../assets/curves/{conductor}.png', transparent=True)
    plt.close()


def changeImageSize(maxWidth,
                    maxHeight,
                    image):

    widthRatio = maxWidth/image.size[0]
    heightRatio = maxHeight/image.size[1]

    newWidth = int(widthRatio*image.size[0])
    newHeight = int(heightRatio*image.size[1])

    newImage = image.resize((newWidth, newHeight))
    return newImage


def generate_image_from_metadata(conductor, background, mathematician, coefficients, index):

    curve_layer = Image.open(
        f'../../assets/curves/{conductor}.png')
    background_layer = Image.open(
        f'../../assets/backgrounds/{background}.png')
    equation_layer = Image.open(
        f'../../assets/equation/equation_centered.png')

    # Make the sizes of images uniform
    curve_layer_sized = changeImageSize(480, 480, curve_layer)
    background_layer_sized = changeImageSize(480, 480, background_layer)
    equation_layer_sized = changeImageSize(480, 480, equation_layer)

    # Create composite image
    curve_layer_sized.convert('RGBA')
    background_layer_sized.convert('RGBA')

    curve_background = Image.alpha_composite(
        background_layer_sized, curve_layer_sized)

    composite = Image.alpha_composite(curve_background, equation_layer)

    title_fill = '#FFFFFF'
    if(background == 'black hole' or background == 'graph paper'):
        title_fill = 'black'

    coefficient_fill = '#FFFFFF'
    if(background == 'stripes' or background == 'graph paper'):
        coefficient_fill = 'black'

    # Add text to image
    font = ImageFont.truetype(
        font='../../assets/fonts/Silkscreen/slkscr.ttf', size=42)

    font_small = ImageFont.truetype(
        font='../../assets/fonts/Silkscreen/slkscr.ttf', size=12)

    canvas = ImageDraw.Draw(composite)
    canvas.text((25, 25), f'{mathematician} ({index})', font=font,
                fill=title_fill)

    canvas.text((25, 325), f'C[1] = {coefficients[0]}', font=font_small,
                fill=coefficient_fill)

    canvas.text((25, 340), f'C[2] = {coefficients[1]}', font=font_small,
                fill=coefficient_fill)

    canvas.text((25, 355), f'C[3] = {coefficients[2]}', font=font_small,
                fill=coefficient_fill)

    canvas.text((25, 370), f'C[4] = {coefficients[3]}', font=font_small,
                fill=coefficient_fill)

    rgb = composite.convert('RGB')

    file_name = f'{conductor}.png'

    folder = '../../assets/composites/' + file_name

    rgb.save(folder)


# Run once before saving all eliptic curve plots
def clear_folder(folder):
    folder = f'../../assets/{folder}'
    files = glob.glob(folder + '/*.png')
    f = os.listdir(folder)
    if len(f) > 0:
        for f in files:
            try:
                os.remove(f)
            except OSError as e:
                print("Error: %s : %s" % (f, e.strerror))


def build_up_metadata(coefficient_data_dict):
    metadata = []
    mathematicians = {}
    primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563]
    # Clear folders
    clear_folder('curves')
    clear_folder('composites')

    for key in coefficient_data_dict:
        coefficients = coefficient_data_dict[key]

        background = background_picker(coefficients[0])

        mathematician = mathematician_picker(coefficients[1])

        if(mathematician in mathematicians):
            mathematicians[mathematician] = mathematicians[mathematician] + 1
        else:
            mathematicians[mathematician] = 0

        # Build up image from layers
        # Saves pngs to folders
        plot_eliptic_curve((key, coefficient_data_dict[key]))
        generate_image_from_metadata(
            key, background, mathematician, coefficients, primes[mathematicians[mathematician]])

        # These will all go in attributes when uploaded to IPFS
        metadata.append({
            "name": f'{mathematician} [{primes[mathematicians[mathematician]]}]',
            "image": f'../../assets/composites/{key}.png',
            "description": "These symmetrical objects live in hyperspace, beyond the 3-dimensional world that we inhabit. So it is impossible to draw pictures or make models of them. Instead, we use the powerful language of mathematics and in particular group theory to explore their properties. Each symmetrical object constructed is unique because the symmetries interact with each other in their own special way. They are special because the structures of these objects are connected to the arithmetic of elliptic curves. If you would like to explore a little bit more of the mathematical significance of these groups then these two papers are where the first groups I constructed are explained. But, be warned, you'll probably need a maths degree to understand the intricacies of these papers. A nilpotent group and its elliptic curve: non-uniformity of local zeta functions of groups, Israel J. of Math 126 (2001), 269-288. Counting subgroups in nilpotent groups and points on elliptic curves, J. Reine Angew. Math. 549 (2002) 1-21.",
            "background": background,
            "group": mathematician,
            "index": str(primes[mathematicians[mathematician]]),
            "C[1]": str(coefficients[0]),
            "C[2]": str(coefficients[1]),
            "C[3]": str(coefficients[2]),
            "C[4]": str(coefficients[3]),
            "conductor": str(key),
            # might not need image here, depends on how ipfs goes
        })

    return metadata


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
        return "Noether"
    elif number < 24:
        return "Diophantus"
    elif number < 27:
        return "Kepler"
    elif number < 31:
        return "Hypatia"
    elif number < 39:
        return "Leibniz"
    elif number < 41:
        return "Napier"
    elif number < 43:
        return "Cantor"
    elif number < 50:
        return "Riemann"
    elif number < 58:
        return "Pascal"
    elif number < 63:
        return "Lovelace"
    elif number < 67:
        return "von Neumann"
    elif number < 73:
        return "Aristotle"
    elif number < 75:
        return "Dodgson"
    elif number < 79:
        return "Kovalevkaya"
    elif number < 83:
        return "Lagrange"
    elif number < 84:
        return "Germain"
    elif number < 85:
        return "Copernicus"
    elif number < 86:
        return "Fourier"
    elif number < 88:
        return "Hilbert"
    elif number < 91:
        return "Pacioli"
    elif number < 92:
        return "Robinson"
    elif number < 93:
        return "Galois"
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
    coefficients_dict = generate_coefficients_dict(25)

    metadata = build_up_metadata(coefficients_dict)

    with open('../metadata.json', 'w') as fout:
        json.dump(metadata, fout)
