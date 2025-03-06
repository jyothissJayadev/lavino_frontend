gameNamesAndPrices = [
    { "name": "Black Forest", "price": "600" },
    { "name": "White Forest", "price": "600" },
    { "name": "Choco Caramel", "price": "1000" },
    { "name": "Irish Caramal", "price": "1000" },
    { "name": "White Praline", "price": "1000" },
    { "name": "Choco Red", "price": "1100" },
    { "name": "Choconut", "price": "1100" },
    { "name": "Honey Almond", "price": "1100" },
    { "name": "Honey Nut", "price": "1100" },
    { "name": "Milky Nut", "price": "1100" },
    { "name": "Almond bublee", "price": "1100" },
    { "name": "Choco Ferracio", "price": "1100" },
    { "name": "Redbee", "price": "1200" },
    { "name": "Spanish Delta", "price": "1200" },
    { "name": "Lollino Kifaya", "price": "1200" },
    { "name": "Classic Vanilla", "price": "1250" },
    { "name": "Fig & Honey", "price": "1250" },
    { "name": "Belgium Chocolate", "price": "1350" },
    { "name": "Classic Arabia", "price": "1350" },
    { "name": "Snickers", "price": "1350" },
    { "name": "White Belgium", "price": "1350" },
    { "name": "Fudgy Nut", "price": "1300" },
    { "name": "German Chocolate", "price": "1300" },
    { "name": "Malai Kulfi", "price": "1300" },
    { "name": "Nutty Bubblee", "price": "1300" },
    { "name": "Oreo", "price": "1300" },
    { "name": "Rich Almond", "price": "1300" },
    { "name": "Nutty Fantacy", "price": "1300" },
    { "name": "Bounty", "price": "1400" },
    { "name": "Butter Nut", "price": "1400" },
    { "name": "Dry Fruit", "price": "1400" },
    { "name": "Ferraro", "price": "1400" },
    { "name": "Fresh Fruit", "price": "1400" },
    { "name": "Galaxy", "price": "1400" },
    { "name": "Rafeelo", "price": "1400" },
    { "name": "Kitkat", "price": "1500" },
    { "name": "Rainbow", "price": "1500" },
    { "name": "Belgium Unique", "price": "1550" }
]
import json
def convert_to_js_format(data, output_file_path):
    js_data = "export const products = [\n"
    for idx, item in enumerate(data, start=1):
        product = f"""
    {{
      id: {idx},
      name: '{item["name"]}',
      price: {int(item["price"])},
      category: 'cakes',
      image: '',
      images: ['', '', ''],
      packageItems: [
        '{item["name"]} (1kg)',
        'Knife'
      ]
    }},"""
        js_data += product
    js_data += "\n];"

    # Save the JS data to a file
    with open(output_file_path, "w") as file:
        file.write(js_data)

# Example usage
if __name__ == "__main__":
    # Input data

    # Output file path
    output_file_path = "converted_data.js"

    # Call the function
    convert_to_js_format(gameNamesAndPrices, output_file_path)

    print(f"Converted data saved to {output_file_path}")
