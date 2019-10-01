#include <iostream>
#include <fstream>
#include <string>

int main(int argc, char const *argv[])
{
	std::fstream f;
	for (int i = 1; i < 73; ++i) {
		std::string fName {"Chapter "};
		std::string change;
		fName += std::to_string(i) + ".md";
		f.open(fName);
		for (int i = 0; i < 15; ++i) {
			getline(f, change);
		}
		f << "# ";
		f.close();
	}
	return 0;
}