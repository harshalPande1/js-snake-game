class A:
    def Display(self):
        return "hi"
    def Show(self): 
        return "hello"
class B(A):
    def Show(self):
        return super().Show() 
objb =  B()
print(objb.Show1())
